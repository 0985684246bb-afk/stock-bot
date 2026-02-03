from __future__ import annotations

import requests


class LineNotifyError(RuntimeError):
    pass


def send_line_notify(token: str, message: str) -> None:
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(
        "https://notify-api.line.me/api/notify",
        headers=headers,
        data={"message": message},
        timeout=30,
    )
    if response.status_code != 200:
        raise LineNotifyError(
            f"LINE Notify error {response.status_code}: {response.text}"
        )
