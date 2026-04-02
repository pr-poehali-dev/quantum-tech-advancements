import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на email btn77@bk.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Заполните все поля'}
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    sender = 'btn77@bk.ru'
    recipient = 'btn77@bk.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта от {name}'
    msg['From'] = sender
    msg['To'] = recipient

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">
            Новая заявка с сайта
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 0; color: #666; width: 100px;"><strong>Имя:</strong></td>
                <td style="padding: 10px 0; color: #1a1a1a;">{name}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; color: #1a1a1a;">
                    <a href="mailto:{email}" style="color: #0066ff;">{email}</a>
                </td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #666; vertical-align: top;"><strong>Сообщение:</strong></td>
                <td style="padding: 10px 0; color: #1a1a1a; white-space: pre-wrap;">{message}</td>
            </tr>
        </table>
    </div>
    """

    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True}
    }