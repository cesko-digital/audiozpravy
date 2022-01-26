from django.contrib.auth.models import Permission
from graphene import ID, ClientIDMutation, Field, ResolveInfo, String, Int
from graphql import GraphQLError
from graphql_jwt.decorators import login_required, permission_required, staff_member_required
from graphql_relay import from_global_id

from .models import Article, Listener, Play, Provider, Playlist, Category
from .types import ArticleNode, ListenerNode, PlayNode, ProviderNode, PlaylistNode



class RegisterListener(ClientIDMutation):
    listener = Field(ListenerNode)

    class Input:
        device_id = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info: ResolveInfo, **input) -> 'RegisterListener':
        device_id = input['device_id']

        listener, created = Listener.objects.get_or_create(
            device_id=device_id
        )

        permission = Permission.objects.get(name='Can change user')
        listener.user_permissions.add(permission)

        listener.save()

        if not created:
            raise GraphQLError('Reporter already exist!')

        return RegisterListener(listener=listener)


class PlayArticle(ClientIDMutation):
    play = Field(PlayNode)

    class Input:
        article_id = String(required=True)
        device_id = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info: ResolveInfo, **input) -> 'PlayArticle':
        article_id = input['article_id']

        listener = Listener.objects.get(username=info.context.listener.username).first()
        play = Play.objects.create(listener=listener, article_id=article_id)

        return PlayArticle(play=play)


class CreateListener(ClientIDMutation):
    listener = Field(ListenerNode)

    class Input:
        first_name = String(required=True)
        last_name = String(required=True)
        username = String(required=True)
        email = String(required=True)
        password = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info: ResolveInfo, **input) -> 'CreateListener':
        first_name = input['first_name']
        last_name = input['last_name']
        username = input['username']
        email = input['email']
        password = input['password']

        listener, created = Listener.objects.get_or_create(
            email=email,
            username=username,
            defaults={
                'first_name': first_name,
                'last_name': last_name,
            }
        )

        permission = Permission.objects.get(name='Can change user')
        listener.user_permissions.add(permission)

        listener.set_password(password)
        listener.save()

        if not created:
            raise GraphQLError('Reporter already exist!')

        return CreateListener(listener=listener)
