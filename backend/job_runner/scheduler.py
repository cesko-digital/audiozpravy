#https://apscheduler.readthedocs.io/en/3.x/userguide.html
import datetime
from typing import List

from apscheduler.schedulers.background import BackgroundScheduler
from job_runner.job_runner import JobRunner


class Scheduler:
    date_in_past = (datetime.datetime.now() - datetime.timedelta(days=1)).date()
    def __init__(self):
        self.scheduler = BackgroundScheduler()
        self.job_runner = JobRunner()

    def create_func(self, func, dep_funcs: List, **kwargs):
        func(**kwargs)
        for dep_func in dep_funcs:
            dep_func(**kwargs)

    def plan_jobs(self):
        process_articles = lambda: self.create_func(func=self.job_runner.get_new_articles,
                                                    dep_funcs=[self.job_runner.create_playlists],
                                                    date_from=self.date_in_past, created_for_date=datetime.date.today())

        #self.job_runner.save_embeddings,
        #self.job_runner.add_audio_for_new_entries,
        self.scheduler.start()
        job = self.scheduler.add_job(process_articles, 'interval', hours=3)
