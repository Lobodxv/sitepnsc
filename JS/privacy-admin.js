const PRIVACY_ADMIN_STORAGE_KEY = 'pnsc_privacy_records';
const PRIVACY_ADMIN_AUDIT_KEY = 'pnsc_privacy_audit';

function readStoredRecords() {
  try {
    return JSON.parse(localStorage.getItem(PRIVACY_ADMIN_STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeStoredRecords(records) {
  localStorage.setItem(PRIVACY_ADMIN_STORAGE_KEY, JSON.stringify(records));
}

function normalizeIdentifier(value) {
  return String(value || '').trim();
}

function normalizeCpf(value) {
  return String(value || '').replace(/\D/g, '');
}

function findMatchingRecords(identifier) {
  const normalizedLookup = normalizeIdentifier(identifier).toLowerCase();
  const normalizedCpf = normalizeCpf(identifier);

  return readStoredRecords().filter((record) => {
    const recordEmail = String(record.email || '').trim().toLowerCase();
    const recordCpf = normalizeCpf(record.cpf || '');
    return recordEmail === normalizedLookup || recordCpf === normalizedCpf;
  });
}

function appendAudit(action, identifier, details) {
  const audits = JSON.parse(localStorage.getItem(PRIVACY_ADMIN_AUDIT_KEY) || '[]');
  audits.push({
    action,
    identifier,
    details,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem(PRIVACY_ADMIN_AUDIT_KEY, JSON.stringify(audits));
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function showResult(type, message) {
  const box = document.getElementById('result-box');
  if (!box) return;
  box.className = `result-box ${type}`;
  box.textContent = message;
}

function exportRecords() {
  const identifier = normalizeIdentifier(document.getElementById('identifier')?.value || '');
  if (!identifier) {
    showResult('error', 'Informe um e-mail ou CPF para localizar registros.');
    return;
  }

  const records = findMatchingRecords(identifier);
  if (!records.length) {
    showResult('error', 'Nenhum dado pessoal foi encontrado para este identificador no armazenamento atual do sistema.');
    return;
  }

  const payload = {
    identifier,
    exportedAt: new Date().toISOString(),
    total: records.length,
    records
  };

  downloadJson(`pnsc-export-${identifier.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`, payload);
  appendAudit('export', identifier, { total: records.length });
  showResult('success', `Arquivo exportado com ${records.length} registro(s) para ${identifier}.`);
}

function anonymizeRecords() {
  const identifier = normalizeIdentifier(document.getElementById('identifier')?.value || '');
  if (!identifier) {
    showResult('error', 'Informe um e-mail ou CPF para localizar registros.');
    return;
  }

  const records = readStoredRecords();
  const matches = records.filter((record) => {
    const email = String(record.email || '').trim().toLowerCase();
    const cpf = normalizeCpf(record.cpf || '');
    const target = normalizeIdentifier(identifier).toLowerCase();
    const targetCpf = normalizeCpf(identifier);
    return email === target || cpf === targetCpf;
  });

  if (!matches.length) {
    showResult('error', 'Nenhum dado pessoal foi encontrado para anonimização ou exclusão.');
    return;
  }

  const anonymousRecords = records.map((record) => {
    const email = String(record.email || '').trim().toLowerCase();
    const cpf = normalizeCpf(record.cpf || '');
    const target = normalizeIdentifier(identifier).toLowerCase();
    const targetCpf = normalizeCpf(identifier);

    const isMatch = email === target || cpf === targetCpf;
    if (!isMatch) return record;

    return {
      ...record,
      nome: 'Titular removido',
      email: 'anonimizado@excluido.local',
      cpf: '***.***.***-**',
      status: 'anonimizado',
      deletedAt: new Date().toISOString(),
      memo: 'Dado removido para atendimento ao direito de exclusão, preservando o mínimo necessário de histórico obrigatório.'
    };
  });

  writeStoredRecords(anonymousRecords);
  appendAudit('anonimization', identifier, { total: matches.length });
  showResult('success', `Registro(s) de ${identifier} foram anonimizados. Histórico obrigatório foi preservado sem identificar a pessoa.`);
}

function initPrivacyAdmin() {
  const exportButton = document.getElementById('export-btn');
  const deleteButton = document.getElementById('delete-btn');

  if (exportButton) {
    exportButton.addEventListener('click', exportRecords);
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', anonymizeRecords);
  }
}

window.addEventListener('DOMContentLoaded', initPrivacyAdmin);
