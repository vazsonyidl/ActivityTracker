FROM python:3.8

WORKDIR /workdir

COPY ./requirements.txt /workdir/requirements.txt

COPY . /workdir

RUN pip3 install -r requirements.txt

RUN python3 init_db.py

CMD ["python3", "./application.py"]