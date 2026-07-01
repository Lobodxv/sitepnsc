/**
 * main.js — Carrega conteúdo público do Supabase
 * Paróquia Nossa Senhora do Carmo (v3.0)
 */

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { SUPABASE_ANON_KEY, SUPABASE_READY, SUPABASE_URL } from "./supabase-config.js";

const CONTENT_SLUG = "geral";

function renderContent(dados) {
  const containerAviso = document.getElementById("container-aviso");
  const textoAviso = document.getElementById("texto-aviso");

  if (containerAviso && textoAviso) {
    if (dados.aviso && dados.aviso.trim() !== "") {
      containerAviso.style.display = "block";
      textoAviso.innerText = dados.aviso;
    } else {
      containerAviso.style.display = "none";
    }
  }

  const txtChave = document.getElementById("txt-chave");
  const txtNome = document.getElementById("txt-nome");

  if (txtChave && dados.pix_chave) {
    txtChave.innerText = dados.pix_chave;
  }

  if (txtNome && dados.pix_nome) {
    txtNome.innerText = dados.pix_nome;
  }
}

async function loadPublicContent() {
  if (!SUPABASE_READY) {
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data, error } = await supabase
    .from("site_content")
    .select("aviso, pix_nome, pix_chave")
    .eq("slug", CONTENT_SLUG)
    .maybeSingle();

  if (error || !data) {
    return;
  }

  renderContent(data);
}

loadPublicContent();
