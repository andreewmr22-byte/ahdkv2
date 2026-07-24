#!/usr/bin/env python3
"""Extrai campos úteis de erros 403 invalid_workspace_selected do Codex/ChatGPT.

Uso:
  python tools/extract_codex_403_info.py --text "<mensagem de erro>"
  cat erro.txt | python tools/extract_codex_403_info.py
"""

from __future__ import annotations

import argparse
import re
import sys
from datetime import datetime, timezone

PATTERNS = {
    "url": r"url:\s*([^,\n]+)",
    "request_id": r"request id:\s*([0-9a-fA-F\-]{8,})",
    "cf_ray": r"cf-ray:\s*([A-Za-z0-9\-]+)",
    "auth_error": r"auth error:\s*(\d{3})",
    "auth_error_code": r"auth error code:\s*([A-Za-z0-9_\-]+)",
    "status": r"unexpected status\s*(\d{3})",
}


def extract(text: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for key, pattern in PATTERNS.items():
        match = re.search(pattern, text, flags=re.IGNORECASE)
        if match:
            result[key] = match.group(1).strip()
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--text", help="mensagem de erro completa")
    args = parser.parse_args()

    text = args.text if args.text else sys.stdin.read()
    if not text.strip():
        print("Erro: informe a mensagem via --text ou stdin.")
        return 1

    data = extract(text)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    print("=== Resumo do erro Codex ===")
    print(f"capturado_em_utc: {now}")
    for key in ["status", "auth_error", "auth_error_code", "url", "cf_ray", "request_id"]:
        print(f"{key}: {data.get(key, 'não encontrado')}")

    print("\n=== Checklist automático ===")
    if data.get("auth_error_code", "").lower() == "invalid_workspace_selected":
        print("- Erro compatível com workspace inválido: SIM")
        print("- Ação 1: trocar workspace no ChatGPT")
        print("- Ação 2: logout/login")
        print("- Ação 3: limpar cookies de chatgpt.com/openai.com")
    else:
        print("- Erro compatível com workspace inválido: NÃO/INCONCLUSIVO")
        print("- Revise a mensagem completa para outro tipo de 403")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
