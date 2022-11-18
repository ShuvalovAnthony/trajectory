FROM python:3.8-alpine
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /django
COPY requirements.txt requirements.txt
RUN apk update && apk add python3-dev gcc libc-dev libffi-dev libpq-dev
RUN pip3 install -r requirements.txt
COPY . .
RUN python manage.py collectstatic -v 3 --no-input