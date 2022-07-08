import argparse
import datetime

from job_runner.job_runner import JobRunner, strtolist
from job_runner.scheduler import Scheduler

if __name__ == '__main__':
    print("Running scheduler")
    scheduler = Scheduler()
    scheduler.run()

