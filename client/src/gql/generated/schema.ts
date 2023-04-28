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
};

export type City = {
  __typename?: 'City';
  id: Scalars['Float'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  poi?: Maybe<Array<Poi>>;
  users?: Maybe<Array<User>>;
};

export type CityId = {
  id: Scalars['Float'];
};

export type CityInput = {
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  photo?: InputMaybe<Scalars['String']>;
};

export type CityRequested = {
  cityName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  createCity: City;
  createPoi: Poi;
  createUser: User;
  deleteCity: Scalars['Boolean'];
  deletePoi: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  fetchCityName: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  sendPasswordEmail: User;
  updateCity: City;
  updatePoi: Scalars['String'];
  updateUser: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  id: Scalars['Int'];
  newPassword: Scalars['String'];
};


export type MutationCreateCityArgs = {
  data: CityInput;
};


export type MutationCreatePoiArgs = {
  data: PoiInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteCityArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePoiArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationFetchCityNameArgs = {
  data: CityRequested;
};


export type MutationLoginArgs = {
  data: UserInput;
};


export type MutationSendPasswordEmailArgs = {
  data: UserSendPassword;
};


export type MutationUpdateCityArgs = {
  data: CityInput;
  id: Scalars['Int'];
};


export type MutationUpdatePoiArgs = {
  data: UpdatePoiInput;
  id: Scalars['Int'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['Int'];
};

export type Poi = {
  __typename?: 'Poi';
  address: Scalars['String'];
  audio?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['Float']>;
  city?: Maybe<City>;
  comments?: Maybe<Scalars['String']>;
  customize_gps_marker?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  phone?: Maybe<Scalars['Float']>;
  photo?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  website?: Maybe<Scalars['String']>;
};

export type PoiInput = {
  address: Scalars['String'];
  cityId: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  rating?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  Pois: Array<Poi>;
  cities: Array<City>;
  city: City;
  fetchToken: User;
  profile: User;
  users: Array<User>;
};


export type QueryCityArgs = {
  name: Scalars['String'];
};


export type QueryFetchTokenArgs = {
  id: Scalars['Float'];
};

export type UpdatePoiInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<Scalars['Float']>;
};

export type UpdateUserInput = {
  cities?: InputMaybe<Array<CityId>>;
  email?: InputMaybe<Scalars['String']>;
  hashedPassword?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  changePasswordToken?: Maybe<Scalars['String']>;
  cities?: Maybe<Array<City>>;
  created_at?: Maybe<Scalars['Float']>;
  email?: Maybe<Scalars['String']>;
  hashedPassword?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  role?: Maybe<Scalars['String']>;
  role_id?: Maybe<Scalars['Float']>;
};

export type UserInput = {
  cities?: InputMaybe<Array<CityId>>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserSendPassword = {
  email: Scalars['String'];
  token?: InputMaybe<Scalars['String']>;
};

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  changePasswordId: Scalars['Int'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'User', hashedPassword?: string | null } };

export type CreatePoiMutationVariables = Exact<{
  data: PoiInput;
}>;


export type CreatePoiMutation = { __typename?: 'Mutation', createPoi: { __typename?: 'Poi', id: number, name: string, address: string } };

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number } };

export type DeleteCityMutationVariables = Exact<{
  deleteCityId: Scalars['Int'];
}>;


export type DeleteCityMutation = { __typename?: 'Mutation', deleteCity: boolean };

export type FetchCityNameMutationVariables = Exact<{
  data: CityRequested;
}>;


export type FetchCityNameMutation = { __typename?: 'Mutation', fetchCityName: string };

export type CitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type CitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'City', id: number, name: string, photo?: string | null, latitude?: number | null, longitude?: number | null }> };

export type GetCityQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type GetCityQuery = { __typename?: 'Query', city: { __typename?: 'City', name: string, latitude?: number | null, longitude?: number | null, poi?: Array<{ __typename?: 'Poi', id: number, name: string, address: string, latitude?: number | null, longitude?: number | null }> | null } };

export type FetchTokenQueryVariables = Exact<{
  fetchTokenId: Scalars['Float'];
}>;


export type FetchTokenQuery = { __typename?: 'Query', fetchToken: { __typename?: 'User', changePasswordToken?: string | null } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, email?: string | null, role?: string | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number }> };

export type LoginMutationVariables = Exact<{
  data: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type SendPasswordEmailMutationVariables = Exact<{
  data: UserSendPassword;
}>;


export type SendPasswordEmailMutation = { __typename?: 'Mutation', sendPasswordEmail: { __typename?: 'User', email?: string | null } };


export const ChangePasswordDocument = gql`
    mutation changePassword($newPassword: String!, $changePasswordId: Int!) {
  changePassword(newPassword: $newPassword, id: $changePasswordId) {
    hashedPassword
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      changePasswordId: // value for 'changePasswordId'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreatePoiDocument = gql`
    mutation CreatePoi($data: PoiInput!) {
  createPoi(data: $data) {
    id
    name
    address
  }
}
    `;
export type CreatePoiMutationFn = Apollo.MutationFunction<CreatePoiMutation, CreatePoiMutationVariables>;

/**
 * __useCreatePoiMutation__
 *
 * To run a mutation, you first call `useCreatePoiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePoiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPoiMutation, { data, loading, error }] = useCreatePoiMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePoiMutation(baseOptions?: Apollo.MutationHookOptions<CreatePoiMutation, CreatePoiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePoiMutation, CreatePoiMutationVariables>(CreatePoiDocument, options);
      }
export type CreatePoiMutationHookResult = ReturnType<typeof useCreatePoiMutation>;
export type CreatePoiMutationResult = Apollo.MutationResult<CreatePoiMutation>;
export type CreatePoiMutationOptions = Apollo.BaseMutationOptions<CreatePoiMutation, CreatePoiMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteCityDocument = gql`
    mutation DeleteCity($deleteCityId: Int!) {
  deleteCity(id: $deleteCityId)
}
    `;
export type DeleteCityMutationFn = Apollo.MutationFunction<DeleteCityMutation, DeleteCityMutationVariables>;

/**
 * __useDeleteCityMutation__
 *
 * To run a mutation, you first call `useDeleteCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCityMutation, { data, loading, error }] = useDeleteCityMutation({
 *   variables: {
 *      deleteCityId: // value for 'deleteCityId'
 *   },
 * });
 */
export function useDeleteCityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCityMutation, DeleteCityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCityMutation, DeleteCityMutationVariables>(DeleteCityDocument, options);
      }
export type DeleteCityMutationHookResult = ReturnType<typeof useDeleteCityMutation>;
export type DeleteCityMutationResult = Apollo.MutationResult<DeleteCityMutation>;
export type DeleteCityMutationOptions = Apollo.BaseMutationOptions<DeleteCityMutation, DeleteCityMutationVariables>;
export const FetchCityNameDocument = gql`
    mutation FetchCityName($data: CityRequested!) {
  fetchCityName(data: $data)
}
    `;
export type FetchCityNameMutationFn = Apollo.MutationFunction<FetchCityNameMutation, FetchCityNameMutationVariables>;

/**
 * __useFetchCityNameMutation__
 *
 * To run a mutation, you first call `useFetchCityNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFetchCityNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fetchCityNameMutation, { data, loading, error }] = useFetchCityNameMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFetchCityNameMutation(baseOptions?: Apollo.MutationHookOptions<FetchCityNameMutation, FetchCityNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FetchCityNameMutation, FetchCityNameMutationVariables>(FetchCityNameDocument, options);
      }
export type FetchCityNameMutationHookResult = ReturnType<typeof useFetchCityNameMutation>;
export type FetchCityNameMutationResult = Apollo.MutationResult<FetchCityNameMutation>;
export type FetchCityNameMutationOptions = Apollo.BaseMutationOptions<FetchCityNameMutation, FetchCityNameMutationVariables>;
export const CitiesDocument = gql`
    query Cities {
  cities {
    id
    name
    photo
    latitude
    longitude
  }
}
    `;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCitiesQuery(baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
      }
export function useCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const GetCityDocument = gql`
    query getCity($query: String!) {
  city(name: $query) {
    name
    latitude
    longitude
    poi {
      id
      name
      address
      latitude
      longitude
    }
  }
}
    `;

/**
 * __useGetCityQuery__
 *
 * To run a query within a React component, call `useGetCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetCityQuery(baseOptions: Apollo.QueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
      }
export function useGetCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCityQuery, GetCityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCityQuery, GetCityQueryVariables>(GetCityDocument, options);
        }
export type GetCityQueryHookResult = ReturnType<typeof useGetCityQuery>;
export type GetCityLazyQueryHookResult = ReturnType<typeof useGetCityLazyQuery>;
export type GetCityQueryResult = Apollo.QueryResult<GetCityQuery, GetCityQueryVariables>;
export const FetchTokenDocument = gql`
    query FetchToken($fetchTokenId: Float!) {
  fetchToken(id: $fetchTokenId) {
    changePasswordToken
  }
}
    `;

/**
 * __useFetchTokenQuery__
 *
 * To run a query within a React component, call `useFetchTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * __useGetCityQuery__
 *
 * To run a query within a React component, call `useGetCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchTokenQuery({
 *   variables: {
 *      fetchTokenId: // value for 'fetchTokenId'
 *   },
 * });
 */
export function useFetchTokenQuery(baseOptions: Apollo.QueryHookOptions<FetchTokenQuery, FetchTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchTokenQuery, FetchTokenQueryVariables>(FetchTokenDocument, options);
      }
export function useFetchTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchTokenQuery, FetchTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchTokenQuery, FetchTokenQueryVariables>(FetchTokenDocument, options);
        }
export type FetchTokenQueryHookResult = ReturnType<typeof useFetchTokenQuery>;
export type FetchTokenLazyQueryHookResult = ReturnType<typeof useFetchTokenLazyQuery>;
export type FetchTokenQueryResult = Apollo.QueryResult<FetchTokenQuery, FetchTokenQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile {
  profile {
    id
    email
    role
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: UserInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SendPasswordEmailDocument = gql`
    mutation sendPasswordEmail($data: UserSendPassword!) {
  sendPasswordEmail(data: $data) {
    email
  }
}
    `;
export type SendPasswordEmailMutationFn = Apollo.MutationFunction<SendPasswordEmailMutation, SendPasswordEmailMutationVariables>;

/**
 * __useSendPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordEmailMutation, { data, loading, error }] = useSendPasswordEmailMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendPasswordEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendPasswordEmailMutation, SendPasswordEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPasswordEmailMutation, SendPasswordEmailMutationVariables>(SendPasswordEmailDocument, options);
      }
export type SendPasswordEmailMutationHookResult = ReturnType<typeof useSendPasswordEmailMutation>;
export type SendPasswordEmailMutationResult = Apollo.MutationResult<SendPasswordEmailMutation>;
export type SendPasswordEmailMutationOptions = Apollo.BaseMutationOptions<SendPasswordEmailMutation, SendPasswordEmailMutationVariables>;