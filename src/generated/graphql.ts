import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type BanStatus = {
  __typename?: 'BanStatus';
  isBanned: Scalars['Boolean']['output'];
  mediaProviderForBan?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
};

export type BanStatusInput = {
  isBanned?: InputMaybe<Scalars['Boolean']['input']>;
  mediaProviderForBan?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type Channel = {
  __typename?: 'Channel';
  channelId: Scalars['String']['output'];
  content: Array<Content>;
  name?: Maybe<Scalars['String']['output']>;
  socials: Array<Social>;
  status?: Maybe<Status>;
};

export type Content = {
  __typename?: 'Content';
  date: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ContentInput = {
  date: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateChannelInput = {
  channelId: Scalars['String']['input'];
  content: Array<ContentInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  socials: Array<SocialInput>;
  status?: InputMaybe<StatusInput>;
};

export type LiveStatus = {
  __typename?: 'LiveStatus';
  isLive: Scalars['Boolean']['output'];
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type LiveStatusInput = {
  isLive?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Channel;
  deleteChannel: Channel;
  latestContent: Content;
  updateChannel: Channel;
};


export type MutationCreateChannelArgs = {
  channel: CreateChannelInput;
  channelId?: InputMaybe<Scalars['String']['input']>;
  mp?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationLatestContentArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationUpdateChannelArgs = {
  channelId?: InputMaybe<Scalars['String']['input']>;
  input: UpdateChannelInput;
  isLive?: InputMaybe<Scalars['Boolean']['input']>;
  vidUrl?: InputMaybe<Scalars['String']['input']>;
};

export type MyType = {
  __typename?: 'MyType';
  created?: Maybe<Scalars['Date']['output']>;
};

export type Query = {
  __typename?: 'Query';
  channels?: Maybe<Array<Maybe<Channel>>>;
  getAllChannels: Array<Channel>;
  getChannel?: Maybe<Channel>;
};


export type QueryGetChannelArgs = {
  channelId: Scalars['String']['input'];
};

export type Social = {
  __typename?: 'Social';
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SocialInput = {
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  bans?: Maybe<BanStatus>;
  live?: Maybe<LiveStatus>;
};

export type StatusInput = {
  bans?: InputMaybe<BanStatusInput>;
  live?: InputMaybe<LiveStatusInput>;
};

export type UpdateChannelInput = {
  content?: InputMaybe<Array<ContentInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<Array<SocialInput>>;
  status?: InputMaybe<StatusInput>;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BanStatus: ResolverTypeWrapper<BanStatus>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  BanStatusInput: BanStatusInput;
  Channel: ResolverTypeWrapper<Channel>;
  Content: ResolverTypeWrapper<Content>;
  ContentInput: ContentInput;
  CreateChannelInput: CreateChannelInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  LiveStatus: ResolverTypeWrapper<LiveStatus>;
  LiveStatusInput: LiveStatusInput;
  Mutation: ResolverTypeWrapper<{}>;
  MyType: ResolverTypeWrapper<MyType>;
  Query: ResolverTypeWrapper<{}>;
  Social: ResolverTypeWrapper<Social>;
  SocialInput: SocialInput;
  Status: ResolverTypeWrapper<Status>;
  StatusInput: StatusInput;
  UpdateChannelInput: UpdateChannelInput;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BanStatus: BanStatus;
  Boolean: Scalars['Boolean']['output'];
  String: Scalars['String']['output'];
  BanStatusInput: BanStatusInput;
  Channel: Channel;
  Content: Content;
  ContentInput: ContentInput;
  CreateChannelInput: CreateChannelInput;
  Date: Scalars['Date']['output'];
  LiveStatus: LiveStatus;
  LiveStatusInput: LiveStatusInput;
  Mutation: {};
  MyType: MyType;
  Query: {};
  Social: Social;
  SocialInput: SocialInput;
  Status: Status;
  StatusInput: StatusInput;
  UpdateChannelInput: UpdateChannelInput;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BanStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['BanStatus'] = ResolversParentTypes['BanStatus']> = {
  isBanned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  mediaProviderForBan?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  channelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Array<ResolversTypes['Content']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socials?: Resolver<Array<ResolversTypes['Social']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Content'] = ResolversParentTypes['Content']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type LiveStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['LiveStatus'] = ResolversParentTypes['LiveStatus']> = {
  isLive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationCreateChannelArgs, 'channel'>>;
  deleteChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationDeleteChannelArgs, 'channelId'>>;
  latestContent?: Resolver<ResolversTypes['Content'], ParentType, ContextType, RequireFields<MutationLatestContentArgs, 'channelId'>>;
  updateChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationUpdateChannelArgs, 'input'>>;
};

export type MyTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MyType'] = ResolversParentTypes['MyType']> = {
  created?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  channels?: Resolver<Maybe<Array<Maybe<ResolversTypes['Channel']>>>, ParentType, ContextType>;
  getAllChannels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  getChannel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QueryGetChannelArgs, 'channelId'>>;
};

export type SocialResolvers<ContextType = any, ParentType extends ResolversParentTypes['Social'] = ResolversParentTypes['Social']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = {
  bans?: Resolver<Maybe<ResolversTypes['BanStatus']>, ParentType, ContextType>;
  live?: Resolver<Maybe<ResolversTypes['LiveStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BanStatus?: BanStatusResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  Content?: ContentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  LiveStatus?: LiveStatusResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  MyType?: MyTypeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Social?: SocialResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';