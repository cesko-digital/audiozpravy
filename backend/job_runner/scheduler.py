#https://apscheduler.readthedocs.io/en/3.x/userguide.html
import datetime
from typing import List

from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore
from API import settings
from job_runner.job_runner import JobRunner




class Scheduler:
    def __init__(self):
        self.scheduler = BackgroundScheduler(timezone=settings.TIME_ZONE)
        self.scheduler.add_jobstore(DjangoJobStore(), "django")
        self.job_runner = JobRunner()

    def create_func(self, func, dep_funcs: List, **kwargs):
        func(**kwargs)
        for dep_func in dep_funcs:
            dep_func(**kwargs)

    def plan_jobs(self, interval: float=3):
        process_articles = lambda: self.create_func(func=self.job_runner.get_new_articles,
                                                    dep_funcs=[self.job_runner.create_playlists])

        #self.job_runner.save_embeddings,
        #self.job_runner.add_audio_for_new_entries,
        cron_job = {'month': '*', 'day': '*', 'hour': '*', 'minute':'*/2'}
        if not self.scheduler.running:
            self.scheduler.start()
            print("Scheduler has started")
        job = self.scheduler.add_job(process_articles, 'cron', jobstore="django", **cron_job)
