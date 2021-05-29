# About

Tool to scrape article names and lead paragraphs (perex) from rss feeds and save
their snapshots. Contains guide how to set the periodic run in aws ec2 machine 
below.

# How to use

1. copy contents to ec2 machine
    ```
    scp -i ~/.aws/<your-key>.pem -r rss_scraper/ ec2-user@<instance-id>.compute.amazonaws.com:/home/ec2-user/
    ```
2. install requirements
    ```
    pip3 install -r rss_scraper/requirements.txt --user
    ```
3. perform test run
    ```
    python3 rss_scraper/main.py
    ```
4. set up cron
    ```
    crontab -e
    ```

    and then type (to run it hourly):
    ```
    0 * * * * pyhton3 /home/ec2-user/rss_scraper_main.py
    ```
5. check cron is running
    ```
    service crond status
    ```
6. upload snapshots to s3
    ```
    aws s3 sync . s3://audiozpravy/articles/ --exclude "*" --include "articles-*"
    ```

# How to develop

## Code Quality

1. Install reqs
   ```
   pip install -r requirements-dev.txt
   ```

2. Fix formatting
    ```
    black pipeline
    isort pipeline --profile black
    ```
