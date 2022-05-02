# pull official base image
FROM python:3.7.13-buster

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apt-get update \
    && apt-get install -y postgresql postgresql-contrib gcc python3

# set work directory
RUN mkdir -p /app
WORKDIR /app

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt


# copy project
COPY . .

# set rights entrypoint.sh
RUN sed -i 's/\r$//g' /app/shell/entrypoint.sh
RUN chmod +x /app/shell/entrypoint.sh

ENTRYPOINT ["/app/shell/entrypoint.sh"]
