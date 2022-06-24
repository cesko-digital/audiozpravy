import argparse
import datetime

from job_runner.job_runner import JobRunner, strtolist

if __name__ == '__main__':
    "Regular jobs that run on a daily basis. Script runs all the jobs 30 minutes after midnight each day "
    args = argparse.ArgumentParser()
    args.add_argument('--sources_names', default='', type=strtolist,
                      help='all sources names that will be scraped by the script. If empty string is given, we '
                           'scrape all available sources. Sources are separated by ",". To view all available sources'
                           'see job_runner.rss_scraper.rss_scraper.SOURCES ')
    date_in_past = (datetime.datetime.now() - datetime.timedelta(days=1)).date()
    cfg = args.parse_args()
    runner = JobRunner()
    runner.get_new_articles(sources_names=cfg.sources_names, dep_funcs=[runner.save_embeddings, runner.add_audio_for_new_entries])
    runner.create_playlists(create_for_date=datetime.date.today(), date_from=date_in_past)
    runner.save_embeddings()
    runner.add_audio_for_new_entries()
