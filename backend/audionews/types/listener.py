import datetime
from typing import Optional, List

import graphene
from django.db.models.query import QuerySet
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from ..models import Article, Listener, Play, Provider
from .play import PlayNode
from .article import ArticleNode
#from classes.queue_filler import QueueFiller

class ListenerNode(DjangoObjectType):
    plays = graphene.List(graphene.NonNull(PlayNode), required=True)
    queue = graphene.List(
        graphene.NonNull(ArticleNode),
        favourite_articles=graphene.List(graphene.Int),
        n_of_messages=graphene.Int(),
        last_articles_date=graphene.String()
    )

    class Meta:
        model = Listener
        interfaces = (Node,)
        filter_fields = {
            "username": ["exact", "icontains", "istartswith"],
            "first_name": ["exact", "icontains", "istartswith"],
            "last_name": ["exact", "icontains", "istartswith"],
            "email": ["exact", "icontains"],
            "device_id": ["exact"],
        }

    def resolve_plays(root, info, **kwargs):
        return Play.objects.filter(listener_id=root.id).all()


    def resolve_queue(
            root, info,
            articles_ids_in_queue: Optional[List[int]] = [],
            n_of_messages: str = 10,
            last_articles_date: str = "2018-10-10"
    ):
        """
        Get recommended articles for a given user

        :param articles_ids_in_queue: ids or articles currently in user's queue
        :param n_of_messages: number of messages to display
        :param last_articles_dat: date of the last article to recommend as string in format YYYY-MM-DD
        """
        user_plays = Listener.objects.get(user_ptr_id=root.id).plays.all()
        user_articles_ids = [play.article.id for play in user_plays]
        if articles_ids_in_queue is not None:
            user_articles_ids.extend(articles_ids_in_queue)

        user_articles = Article.objects.filter(id__in=user_articles_ids)

        # get user history articles
        our_date = datetime.datetime.strptime(last_articles_date, "%Y-%m-%d")
        all_articles = Article.objects.filter(pub_date__gte=our_date)

        recommended_ids = [a.id for a in all_articles] #QueueFiller.recommend_articles(user_articles, all_articles)
        recommended_articles_queue = Article.objects.filter(id__in=recommended_ids[:n_of_messages])
        return recommended_articles_queue
