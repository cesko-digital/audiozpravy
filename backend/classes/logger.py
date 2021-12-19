import datetime
import os
import logging
from logging.handlers import RotatingFileHandler
parent_directory = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))

def now_as_string():
    return str(datetime.datetime.now())

class Logger:
    def __init__(self, name=""):
        # instantiate logger
        logging.basicConfig(level=logging.ERROR)
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)
        file_path = os.path.join(parent_directory, "logs", f"{name}-{now_as_string()}.log")
        """
        self.handler = RotatingFileHandler(file_path, maxBytes=10000000, backupCount=5)
        self.handler.setLevel(logging.INFO)

        # create a logging format
        self.formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        self.handler.setFormatter(self.formatter)

        # add the handlers to the logger
        self.logger.addHandler(self.handler)
        self.logger.info("Logger ready to be used")
        """
