#https://apscheduler.readthedocs.io/en/3.x/userguide.html
from typing import List
from apscheduler.schedulers.background import BackgroundScheduler
from API import settings
from job_runner.job_runner import JobRunner




class Scheduler:
    def __init__(self):
        self.scheduler = BackgroundScheduler(timezone=settings.TIME_ZONE)
        self.job_runner = JobRunner()
        self.job = None

    def create_func(self, func, dep_funcs: List, **kwargs):
        func(**kwargs)
        for dep_func in dep_funcs:
            dep_func(**kwargs)

    def run(self):
        if not self.scheduler.running:
            self.scheduler.start()
            print("Scheduler has started")

    def add_job(self, hours='*', minutes="*"):
        job_id = "abc"
        cron_job = {'month': '*', 'day': '*', 'hour': hours, 'minute': minutes}
        process_articles = lambda: self.create_func(func=self.job_runner.get_new_articles,
                                                    dep_funcs=[self.job_runner.create_playlists])

        #self.job_runner.save_embeddings,
        #self.job_runner.add_audio_for_new_entries,
        if self.job:
            self.scheduler.remove_job(job_id)
        self.job = self.scheduler.add_job(process_articles, 'cron', id=job_id,  **cron_job)

