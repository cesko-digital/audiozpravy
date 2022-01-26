import datetime
from typing import Optional, List

import graphene
from django.db.models.query import QuerySet
from graphene.relay import Connection, Node
from graphene_django import DjangoConnectionField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql.execution.base import ResolveInfo
from promise.promise import Promise
from ..models import Article, Listener, Play, Provider
from .play import PlayNode
from .article import ArticleNode
from classes.queue_filler import QueueFiller

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
            favourite_articles: Optional[List[int]] = None,
            n_of_messages: str = 10,
            last_articles_date: str = "2018-10-10"
    ):
        """
        Get recommended articles for a given user

        :param n_of_messages: number of messages to display
        :param last_articles_dat: date of the last article to recommend as string in format YYYY-MM-DD
        """
        user_plays = Listener.objects.get(user_ptr_id=root.id).plays.all()
        user_articles_ids = [play.article.id for play in user_plays]
        if favourite_articles is not None:
            user_articles_ids.extend(favourite_articles)

        user_articles = Article.objects.filter(id__in=user_articles_ids)

        # get user history articles
        our_date = datetime.datetime.strptime(last_articles_date, "%Y-%m-%d")
        all_articles = Article.objects.filter(pub_date__gte=our_date)

        recommended_ids = QueueFiller.recommend_articles(user_articles, all_articles)
        recommended_articles_queue = Article.objects.filter(id__in=recommended_ids[:n_of_messages])
        return recommended_articles_queue
