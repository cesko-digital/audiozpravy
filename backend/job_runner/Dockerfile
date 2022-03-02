FROM python:3
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt && \
    curl --remote-name-all https://lindat.mff.cuni.cz/repository/xmlui/bitstream/handle/11234/1-1836{/czech-morfflex-pdt-161115.zip} && \
    unzip czech-morfflex-pdt-161115.zip && \
    rm czech-morfflex-pdt-161115.zip

COPY . .
CMD [ "python3", "job_runner.py"]

