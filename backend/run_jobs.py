import argparse
import datetime

from job_runner.main_jobs import JobRunner, strtolist

if __name__ == '__main__':
    "Regular jobs that run on a daily basis. Script runs all the jobs 30 minutes after midnight each day "
    args = argparse.ArgumentParser()
    args.add_argument('--bert-path', default='job_runner/data/bg_cs_pl_ru_cased_L-12_H-768_A-12_pt')
    args.add_argument('--vectors-path', default='job_runner/data/articles_embeddings.json')
    args.add_argument('--audio-path', default='job_runner/data/audio/')
    args.add_argument('--n-past-days', default=300,
                      help = 'Number of days to consider for articles to recommend for categories. for value 4 we '
                             'consider only articles in last 4 days.')
    args.add_argument('--sources_names', default='', type=strtolist,
                      help='all sources names that will be scraped by the script. If empty string is given, we '
                           'scrape all available sources. Sources are separated by ",". To view all available sources'
                           'see job_runner.rss_scraper.rss_scraper.SOURCES ')

    cfg = args.parse_args()
    date_today = datetime.date.today()
    runner = JobRunner()
    runner.get_new_articles(sources_names=cfg.sources_names)
    date_in_past = (datetime.datetime.now() - datetime.timedelta(days=cfg.n_past_days)).date()
    runner.create_playlists(date_today, date_in_past)
    runner.save_embeddings(cfg.bert_path, cfg.vectors_path)
    runner.add_audio_for_new_entries(cfg.audio_path)
