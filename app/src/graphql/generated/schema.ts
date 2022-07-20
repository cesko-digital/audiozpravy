import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   *
   *     Errors messages and codes mapped to
   *     fields or non fields errors.
   *     Example:
   *     {
   *         field_name: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         other_field: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ],
   *         nonFieldErrors: [
   *             {
   *                 "message": "error message",
   *                 "code": "error_code"
   *             }
   *         ]
   *     }
   *
   */
  ExpectedErrorType: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type ArticleNode = Node & {
  __typename?: 'ArticleNode';
  category: CategoryNode;
  /** The ID of the object. */
  id: Scalars['ID'];
  perex: Scalars['String'];
  pictureUrl?: Maybe<Scalars['String']>;
  playlists: PlaylistNodeConnection;
  plays: PlayNodeConnection;
  provider: ProviderNode;
  pubDate: Scalars['DateTime'];
  recordingCreatedAt?: Maybe<Scalars['DateTime']>;
  recordingUrl?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};


export type ArticleNodePlaylistsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  preparedForDate_Gte?: InputMaybe<Scalars['Date']>;
  preparedForDate_Lte?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<Scalars['String']>;
};


export type ArticleNodePlaysArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ArticleNodeConnection = {
  __typename?: 'ArticleNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ArticleNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ArticleNode` and its cursor. */
export type ArticleNodeEdge = {
  __typename?: 'ArticleNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ArticleNode>;
};

export type CategoryNode = Node & {
  __typename?: 'CategoryNode';
  articles: ArticleNodeConnection;
  /** The ID of the object. */
  id: Scalars['ID'];
  key: Scalars['String'];
  name: Scalars['String'];
  playlists: PlaylistNodeConnection;
};


export type CategoryNodeArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  category_Key?: InputMaybe<Scalars['String']>;
  category_Key_In?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  category_Name?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  perex?: InputMaybe<Scalars['String']>;
  perex_Icontains?: InputMaybe<Scalars['String']>;
  perex_Istartswith?: InputMaybe<Scalars['String']>;
  pubDate_Gte?: InputMaybe<Scalars['DateTime']>;
  pubDate_Isnull?: InputMaybe<Scalars['Boolean']>;
  pubDate_Lte?: InputMaybe<Scalars['DateTime']>;
  recordingUrl_Isnull?: InputMaybe<Scalars['Boolean']>;
  text_Icontains?: InputMaybe<Scalars['String']>;
  text_Istartswith?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_Icontains?: InputMaybe<Scalars['String']>;
  title_Istartswith?: InputMaybe<Scalars['String']>;
};


export type CategoryNodePlaylistsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  preparedForDate_Gte?: InputMaybe<Scalars['Date']>;
  preparedForDate_Lte?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Debugging information for the current query. */
export type DjangoDebug = {
  __typename?: 'DjangoDebug';
  /** Executed SQL queries for this API query. */
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

/** Represents a single database query made to a Django managed DB. */
export type DjangoDebugSql = {
  __typename?: 'DjangoDebugSQL';
  /** The Django database alias (e.g. 'default'). */
  alias: Scalars['String'];
  /** Duration of this database query in seconds. */
  duration: Scalars['Float'];
  /** Postgres connection encoding if available. */
  encoding?: Maybe<Scalars['String']>;
  /** Whether this database query was a SELECT. */
  isSelect: Scalars['Boolean'];
  /** Whether this database query took more than 10 seconds. */
  isSlow: Scalars['Boolean'];
  /** Postgres isolation level if available. */
  isoLevel?: Maybe<Scalars['String']>;
  /** JSON encoded database query parameters. */
  params: Scalars['String'];
  /** The raw SQL of this query, without params. */
  rawSql: Scalars['String'];
  /** The actual SQL sent to this database. */
  sql?: Maybe<Scalars['String']>;
  /** Start time of this database query. */
  startTime: Scalars['Float'];
  /** Stop time of this database query. */
  stopTime: Scalars['Float'];
  /** Postgres transaction ID if available. */
  transId?: Maybe<Scalars['String']>;
  /** Postgres transaction status if available. */
  transStatus?: Maybe<Scalars['String']>;
  /** The type of database being used (e.g. postrgesql, mysql, sqlite). */
  vendor: Scalars['String'];
};

export type ListenerNode = Node & {
  __typename?: 'ListenerNode';
  dateJoined: Scalars['DateTime'];
  deviceId: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  plays: Array<PlayNode>;
  queue?: Maybe<Array<ArticleNode>>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
};


export type ListenerNodeQueueArgs = {
  favouriteArticles?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lastArticlesDate?: InputMaybe<Scalars['String']>;
  nOfMessages?: InputMaybe<Scalars['Int']>;
};

export type ListenerNodeConnection = {
  __typename?: 'ListenerNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<ListenerNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `ListenerNode` and its cursor. */
export type ListenerNodeEdge = {
  __typename?: 'ListenerNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<ListenerNode>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Record a play of an article. */
  playArticle?: Maybe<PlayArticlePayload>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  refreshToken?: Maybe<RefreshToken>;
  /** Create a single listener. */
  registerListener?: Maybe<RegisterListenerPayload>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  revokeToken?: Maybe<RevokeToken>;
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  /** Same as `grapgql_jwt` implementation, with standard output. */
  verifyToken?: Maybe<VerifyToken>;
};


export type MutationPlayArticleArgs = {
  input: PlayArticleInput;
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterListenerArgs = {
  input: RegisterListenerInput;
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  /** Listener node of the current user. */
  listener?: Maybe<ListenerNode>;
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PlayArticleInput = {
  articleId: Scalars['String'];
  clientMutationId?: InputMaybe<Scalars['String']>;
};

export type PlayArticlePayload = {
  __typename?: 'PlayArticlePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  play?: Maybe<PlayNode>;
};

export type PlayNode = Node & {
  __typename?: 'PlayNode';
  article: ArticleNode;
  /** The ID of the object. */
  id: Scalars['ID'];
  listener: ListenerNode;
  playedAt: Scalars['DateTime'];
};

export type PlayNodeConnection = {
  __typename?: 'PlayNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PlayNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PlayNode` and its cursor. */
export type PlayNodeEdge = {
  __typename?: 'PlayNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PlayNode>;
};

export type PlaylistNode = Node & {
  __typename?: 'PlaylistNode';
  articles: Array<ArticleNode>;
  articlesForCategory?: Maybe<Array<ArticleNode>>;
  category: CategoryNode;
  createdAt: Scalars['DateTime'];
  /** The ID of the object. */
  id: Scalars['ID'];
  preparedForDate: Scalars['Date'];
  type: Scalars['String'];
};


export type PlaylistNodeArticlesForCategoryArgs = {
  categoryName?: InputMaybe<Scalars['String']>;
  forDate?: InputMaybe<Scalars['Date']>;
};

export type PlaylistNodeConnection = {
  __typename?: 'PlaylistNodeConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<PlaylistNodeEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `PlaylistNode` and its cursor. */
export type PlaylistNodeEdge = {
  __typename?: 'PlaylistNodeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PlaylistNode>;
};

export type ProviderNode = Node & {
  __typename?: 'ProviderNode';
  articles: ArticleNodeConnection;
  /** The ID of the object. */
  id: Scalars['ID'];
  name: Scalars['String'];
  rssFeedUrl: Scalars['String'];
  websiteUrl: Scalars['String'];
};


export type ProviderNodeArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  category_Key?: InputMaybe<Scalars['String']>;
  category_Key_In?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  category_Name?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  perex?: InputMaybe<Scalars['String']>;
  perex_Icontains?: InputMaybe<Scalars['String']>;
  perex_Istartswith?: InputMaybe<Scalars['String']>;
  pubDate_Gte?: InputMaybe<Scalars['DateTime']>;
  pubDate_Isnull?: InputMaybe<Scalars['Boolean']>;
  pubDate_Lte?: InputMaybe<Scalars['DateTime']>;
  recordingUrl_Isnull?: InputMaybe<Scalars['Boolean']>;
  text_Icontains?: InputMaybe<Scalars['String']>;
  text_Istartswith?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_Icontains?: InputMaybe<Scalars['String']>;
  title_Istartswith?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _debug?: Maybe<DjangoDebug>;
  /** Retrieve a single article node. */
  article?: Maybe<ArticleNode>;
  /** Return list of articles. */
  articles?: Maybe<ArticleNodeConnection>;
  /** Return list of articles. */
  categories?: Maybe<Array<Maybe<CategoryNode>>>;
  /** Retrieve a single listener node. */
  listener?: Maybe<ListenerNode>;
  /** Return list of listeners. */
  listeners?: Maybe<ListenerNodeConnection>;
  me?: Maybe<ListenerNode>;
  /** Return list of my unheard articles. */
  myArticles?: Maybe<ArticleNodeConnection>;
  /** Return list of playlists. */
  playlists?: Maybe<PlaylistNodeConnection>;
  /** Return list of playlists for this week. */
  playlistsForThisWeek?: Maybe<Array<Maybe<PlaylistNode>>>;
  /** Return list of playlists for today. */
  playlistsForToday?: Maybe<Array<Maybe<PlaylistNode>>>;
  /** Return list of providers. */
  providers?: Maybe<Array<Maybe<ProviderNode>>>;
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};


export type QueryArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  category_Key?: InputMaybe<Scalars['String']>;
  category_Key_In?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  category_Name?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  perex?: InputMaybe<Scalars['String']>;
  perex_Icontains?: InputMaybe<Scalars['String']>;
  perex_Istartswith?: InputMaybe<Scalars['String']>;
  pubDate_Gte?: InputMaybe<Scalars['DateTime']>;
  pubDate_Isnull?: InputMaybe<Scalars['Boolean']>;
  pubDate_Lte?: InputMaybe<Scalars['DateTime']>;
  recordingUrl_Isnull?: InputMaybe<Scalars['Boolean']>;
  text_Icontains?: InputMaybe<Scalars['String']>;
  text_Istartswith?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_Icontains?: InputMaybe<Scalars['String']>;
  title_Istartswith?: InputMaybe<Scalars['String']>;
};


export type QueryListenerArgs = {
  id: Scalars['ID'];
};


export type QueryListenersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  deviceId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_Icontains?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  firstName?: InputMaybe<Scalars['String']>;
  firstName_Icontains?: InputMaybe<Scalars['String']>;
  firstName_Istartswith?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  lastName?: InputMaybe<Scalars['String']>;
  lastName_Icontains?: InputMaybe<Scalars['String']>;
  lastName_Istartswith?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
  username_Icontains?: InputMaybe<Scalars['String']>;
  username_Istartswith?: InputMaybe<Scalars['String']>;
};


export type QueryMyArticlesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  category_Key?: InputMaybe<Scalars['String']>;
  category_Key_In?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  category_Name?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  perex?: InputMaybe<Scalars['String']>;
  perex_Icontains?: InputMaybe<Scalars['String']>;
  perex_Istartswith?: InputMaybe<Scalars['String']>;
  pubDate_Gte?: InputMaybe<Scalars['DateTime']>;
  pubDate_Isnull?: InputMaybe<Scalars['Boolean']>;
  pubDate_Lte?: InputMaybe<Scalars['DateTime']>;
  recordingUrl_Isnull?: InputMaybe<Scalars['Boolean']>;
  text_Icontains?: InputMaybe<Scalars['String']>;
  text_Istartswith?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  title_Icontains?: InputMaybe<Scalars['String']>;
  title_Istartswith?: InputMaybe<Scalars['String']>;
};


export type QueryPlaylistsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  preparedForDate_Gte?: InputMaybe<Scalars['Date']>;
  preparedForDate_Lte?: InputMaybe<Scalars['Date']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RefreshToken = {
  __typename?: 'RefreshToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  refreshToken?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

export type RegisterListenerInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['String'];
};

export type RegisterListenerPayload = {
  __typename?: 'RegisterListenerPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  listener?: Maybe<ListenerNode>;
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type RevokeToken = {
  __typename?: 'RevokeToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  revoked?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Same as `grapgql_jwt` implementation, with standard output. */
export type VerifyToken = {
  __typename?: 'VerifyToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  payload?: Maybe<Scalars['GenericScalar']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PlayArticleMutationVariables = Exact<{
  articleID: Scalars['String'];
}>;


export type PlayArticleMutation = { __typename?: 'Mutation', playArticle?: { __typename?: 'PlayArticlePayload', clientMutationId?: string | null } | null };

export type RegisterListernerMutationVariables = Exact<{
  deviceID: Scalars['String'];
}>;


export type RegisterListernerMutation = { __typename?: 'Mutation', registerListener?: { __typename?: 'RegisterListenerPayload', token?: string | null } | null };

export type PlaylistsForTodayQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaylistsForTodayQuery = { __typename?: 'Query', playlists?: Array<{ __typename?: 'PlaylistNode', preparedForDate: any, createdAt: any, type: string, category: { __typename?: 'CategoryNode', key: string }, articles: Array<{ __typename?: 'ArticleNode', id: string, title: string, url?: string | null, publishedAt: any, artist: { __typename?: 'ProviderNode', id: string, name: string } }> } | null> | null };

export type PlaylistsForThisWeekQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaylistsForThisWeekQuery = { __typename?: 'Query', playlists?: Array<{ __typename?: 'PlaylistNode', preparedForDate: any, createdAt: any, type: string, category: { __typename?: 'CategoryNode', key: string }, articles: Array<{ __typename?: 'ArticleNode', id: string, title: string, url?: string | null, image?: string | null, publishedAt: any, artist: { __typename?: 'ProviderNode', id: string, name: string } }> } | null> | null };

export type ArticlesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  gteDate?: InputMaybe<Scalars['DateTime']>;
  lteDate?: InputMaybe<Scalars['DateTime']>;
}>;


export type ArticlesQuery = { __typename?: 'Query', myArticles?: { __typename?: 'ArticleNodeConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'ArticleNodeEdge', node?: { __typename?: 'ArticleNode', id: string, title: string, url?: string | null, publishedAt: any, provider: { __typename?: 'ProviderNode', name: string, id: string } } | null } | null> } | null };


export const PlayArticleDocument = gql`
    mutation PlayArticle($articleID: String!) {
  playArticle(input: {articleId: $articleID}) {
    clientMutationId
  }
}
    `;
export type PlayArticleMutationFn = Apollo.MutationFunction<PlayArticleMutation, PlayArticleMutationVariables>;

/**
 * __usePlayArticleMutation__
 *
 * To run a mutation, you first call `usePlayArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePlayArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [playArticleMutation, { data, loading, error }] = usePlayArticleMutation({
 *   variables: {
 *      articleID: // value for 'articleID'
 *   },
 * });
 */
export function usePlayArticleMutation(baseOptions?: Apollo.MutationHookOptions<PlayArticleMutation, PlayArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PlayArticleMutation, PlayArticleMutationVariables>(PlayArticleDocument, options);
      }
export type PlayArticleMutationHookResult = ReturnType<typeof usePlayArticleMutation>;
export type PlayArticleMutationResult = Apollo.MutationResult<PlayArticleMutation>;
export type PlayArticleMutationOptions = Apollo.BaseMutationOptions<PlayArticleMutation, PlayArticleMutationVariables>;
export const RegisterListernerDocument = gql`
    mutation RegisterListerner($deviceID: String!) {
  registerListener(input: {deviceId: $deviceID}) {
    token
  }
}
    `;
export type RegisterListernerMutationFn = Apollo.MutationFunction<RegisterListernerMutation, RegisterListernerMutationVariables>;

/**
 * __useRegisterListernerMutation__
 *
 * To run a mutation, you first call `useRegisterListernerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterListernerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerListernerMutation, { data, loading, error }] = useRegisterListernerMutation({
 *   variables: {
 *      deviceID: // value for 'deviceID'
 *   },
 * });
 */
export function useRegisterListernerMutation(baseOptions?: Apollo.MutationHookOptions<RegisterListernerMutation, RegisterListernerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterListernerMutation, RegisterListernerMutationVariables>(RegisterListernerDocument, options);
      }
export type RegisterListernerMutationHookResult = ReturnType<typeof useRegisterListernerMutation>;
export type RegisterListernerMutationResult = Apollo.MutationResult<RegisterListernerMutation>;
export type RegisterListernerMutationOptions = Apollo.BaseMutationOptions<RegisterListernerMutation, RegisterListernerMutationVariables>;
export const PlaylistsForTodayDocument = gql`
    query playlistsForToday {
  playlists: playlistsForToday {
    category {
      key
    }
    articles {
      id
      url: recordingUrl
      title
      publishedAt: pubDate
      artist: provider {
        id
        name
      }
    }
    preparedForDate
    createdAt
    type
  }
}
    `;

/**
 * __usePlaylistsForTodayQuery__
 *
 * To run a query within a React component, call `usePlaylistsForTodayQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistsForTodayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistsForTodayQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaylistsForTodayQuery(baseOptions?: Apollo.QueryHookOptions<PlaylistsForTodayQuery, PlaylistsForTodayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistsForTodayQuery, PlaylistsForTodayQueryVariables>(PlaylistsForTodayDocument, options);
      }
export function usePlaylistsForTodayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistsForTodayQuery, PlaylistsForTodayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistsForTodayQuery, PlaylistsForTodayQueryVariables>(PlaylistsForTodayDocument, options);
        }
export type PlaylistsForTodayQueryHookResult = ReturnType<typeof usePlaylistsForTodayQuery>;
export type PlaylistsForTodayLazyQueryHookResult = ReturnType<typeof usePlaylistsForTodayLazyQuery>;
export type PlaylistsForTodayQueryResult = Apollo.QueryResult<PlaylistsForTodayQuery, PlaylistsForTodayQueryVariables>;
export const PlaylistsForThisWeekDocument = gql`
    query playlistsForThisWeek {
  playlists: playlistsForThisWeek {
    category {
      key
    }
    articles {
      id
      url: recordingUrl
      image: pictureUrl
      title
      publishedAt: pubDate
      artist: provider {
        id
        name
      }
    }
    preparedForDate
    createdAt
    type
  }
}
    `;

/**
 * __usePlaylistsForThisWeekQuery__
 *
 * To run a query within a React component, call `usePlaylistsForThisWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaylistsForThisWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaylistsForThisWeekQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaylistsForThisWeekQuery(baseOptions?: Apollo.QueryHookOptions<PlaylistsForThisWeekQuery, PlaylistsForThisWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaylistsForThisWeekQuery, PlaylistsForThisWeekQueryVariables>(PlaylistsForThisWeekDocument, options);
      }
export function usePlaylistsForThisWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaylistsForThisWeekQuery, PlaylistsForThisWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaylistsForThisWeekQuery, PlaylistsForThisWeekQueryVariables>(PlaylistsForThisWeekDocument, options);
        }
export type PlaylistsForThisWeekQueryHookResult = ReturnType<typeof usePlaylistsForThisWeekQuery>;
export type PlaylistsForThisWeekLazyQueryHookResult = ReturnType<typeof usePlaylistsForThisWeekLazyQuery>;
export type PlaylistsForThisWeekQueryResult = Apollo.QueryResult<PlaylistsForThisWeekQuery, PlaylistsForThisWeekQueryVariables>;
export const ArticlesDocument = gql`
    query Articles($first: Int, $after: String, $categories: [ID], $gteDate: DateTime, $lteDate: DateTime) {
  myArticles(
    first: $first
    after: $after
    category_Key_In: $categories
    pubDate_Gte: $gteDate
    pubDate_Lte: $lteDate
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        title
        url: recordingUrl
        publishedAt: pubDate
        provider {
          name
          id
        }
      }
    }
  }
}
    `;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      categories: // value for 'categories'
 *      gteDate: // value for 'gteDate'
 *      lteDate: // value for 'lteDate'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;