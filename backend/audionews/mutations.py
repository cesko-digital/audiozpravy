from django.contrib.auth.models import Permission
from graphene import ID, ClientIDMutation, Field, ResolveInfo, String, Int
from graphql import GraphQLError
from graphql_jwt.decorators import login_required, permission_required, staff_member_required
from graphql_relay import from_global_id
from uuid import uuid4
from .models import Article, Listener, Play, Provider, Playlist, Category
from .types import ArticleNode, ListenerNode, PlayNode, ProviderNode, PlaylistNode
from graphql_jwt.shortcuts import get_token
from django.contrib.auth.models import User

class RegisterListener(ClientIDMutation):
    listener = Field(ListenerNode)
    token = String()
    refresh_token = String()

    class Input:
        device_id = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info: ResolveInfo, **input) -> 'RegisterListener':
        device_id = input['device_id']

        user, created = User.objects.get_or_create(
            username=device_id,
        )

        listener, created = Listener.objects.get_or_create(
            device_id=device_id,
            user=user
        )

        token = get_token(user)
        if not created:
            return RegisterListener(listener=listener, token=token)

        permission = Permission.objects.get(name='Can change user')
        user.user_permissions.add(permission)

        user.set_password(device_id)
        user.save()

        return RegisterListener(listener=listener, token=token)


class PlayArticle(ClientIDMutation):
    play = Field(PlayNode)

    class Input:
        article_id = Int(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info: ResolveInfo, **input) -> 'PlayArticle':
        article_id = input['article_id']

        listener = Listener.objects.filter(user__username=info.context.user.username).first()
        play = Play.objects.create(listener=listener, article__id=article_id)

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
