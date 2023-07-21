import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
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
    __typename?: "City";
    id: Scalars["Float"];
    latitude?: Maybe<Scalars["Float"]>;
    longitude?: Maybe<Scalars["Float"]>;
    name: Scalars["String"];
    photo?: Maybe<Scalars["String"]>;
    poi?: Maybe<Array<Poi>>;
    users?: Maybe<Array<User>>;
};

export type CityId = {
    id: Scalars["Float"];
};

export type CityInput = {
    latitude?: InputMaybe<Scalars["Float"]>;
    longitude?: InputMaybe<Scalars["Float"]>;
    name: Scalars["String"];
    photo?: InputMaybe<Scalars["String"]>;
};

export type CityRequested = {
    cityName: Scalars["String"];
};

export type Mutation = {
    __typename?: "Mutation";
    changePassword: User;
    createCity: City;
    createPoi: Poi;
    createUser: User;
    deleteCity: Scalars["Boolean"];
    deletePoi: Scalars["Boolean"];
    deleteUser: Scalars["Boolean"];
    fetchCityName: Scalars["String"];
    fetchPoiCoordinates: Scalars["String"];
    login: Scalars["String"];
    logout: Scalars["String"];
    sendPasswordEmail: User;
    updateCity: City;
    updatePoi: Scalars["String"];
    updateUser: Scalars["String"];
};

export type MutationChangePasswordArgs = {
    id: Scalars["Int"];
    newPassword: Scalars["String"];
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
    id: Scalars["Int"];
};

export type MutationDeletePoiArgs = {
    id: Scalars["Int"];
};

export type MutationDeleteUserArgs = {
    id: Scalars["Int"];
};

export type MutationFetchCityNameArgs = {
    data: CityRequested;
};

export type MutationFetchPoiCoordinatesArgs = {
    data: FindPoi;
};

export type MutationLoginArgs = {
    data: UserInput;
};

export type MutationSendPasswordEmailArgs = {
    data: UserSendPassword;
};

export type MutationUpdateCityArgs = {
    data: CityInput;
    id: Scalars["Int"];
};

export type MutationUpdatePoiArgs = {
    data: UpdatePoiInput;
    id: Scalars["Int"];
};

export type MutationUpdateUserArgs = {
    data: UpdateUserInput;
    id: Scalars["Int"];
};

export type Poi = {
    __typename?: "Poi";
    address: Scalars["String"];
    audio?: Maybe<Scalars["String"]>;
    categoryId?: Maybe<Scalars["Float"]>;
    city?: Maybe<City>;
    comments?: Maybe<Scalars["String"]>;
    customize_gps_marker?: Maybe<Scalars["String"]>;
    description?: Maybe<Scalars["String"]>;
    id: Scalars["Float"];
    latitude?: Maybe<Scalars["Float"]>;
    longitude?: Maybe<Scalars["Float"]>;
    name: Scalars["String"];
    phone?: Maybe<Scalars["Float"]>;
    photo?: Maybe<Scalars["String"]>;
    rating?: Maybe<Scalars["Float"]>;
    website?: Maybe<Scalars["String"]>;
};

export type PoiInput = {
    address: Scalars["String"];
    cityId: Scalars["Float"];
    description?: InputMaybe<Scalars["String"]>;
    latitude?: InputMaybe<Scalars["Float"]>;
    longitude?: InputMaybe<Scalars["Float"]>;
    name: Scalars["String"];
    rating?: InputMaybe<Scalars["Float"]>;
};

export type Query = {
    __typename?: "Query";
    Pois: Array<Poi>;
    cities: Array<City>;
    city: City;
    fetchToken: User;
    profile: User;
    users: Array<User>;
};

export type QueryCityArgs = {
    name: Scalars["String"];
};

export type QueryFetchTokenArgs = {
    id: Scalars["Float"];
};

export type UpdatePoiInput = {
    address: Scalars["String"];
    description?: InputMaybe<Scalars["String"]>;
    name?: InputMaybe<Scalars["String"]>;
    rating?: InputMaybe<Scalars["Float"]>;
};

export type UpdateUserInput = {
    cities?: InputMaybe<Array<CityId>>;
    email?: InputMaybe<Scalars["String"]>;
    hashedPassword?: InputMaybe<Scalars["String"]>;
};

export type User = {
    __typename?: "User";
    changePasswordToken?: Maybe<Scalars["String"]>;
    cities?: Maybe<Array<City>>;
    created_at?: Maybe<Scalars["Float"]>;
    email?: Maybe<Scalars["String"]>;
    hashedPassword?: Maybe<Scalars["String"]>;
    id: Scalars["Float"];
    profilePicture?: Maybe<Scalars["String"]>;
    role?: Maybe<Scalars["String"]>;
    role_id?: Maybe<Scalars["Float"]>;
    userName?: Maybe<Scalars["String"]>;
};

export type UserInput = {
    cities?: InputMaybe<Array<CityId>>;
    email: Scalars["String"];
    password: Scalars["String"];
    profilePicture?: InputMaybe<Scalars["String"]>;
    userName?: InputMaybe<Scalars["String"]>;
};

export type UserSendPassword = {
    email: Scalars["String"];
    token?: InputMaybe<Scalars["String"]>;
};

export type FindPoi = {
    cityId: Scalars["Float"];
    cityName: Scalars["String"];
    poiNameOrAdress: Scalars["String"];
};

export type CreateUserMutationVariables = Exact<{
    data: UserInput;
}>;

export type CreateUserMutation = {
    __typename?: "Mutation";
    createUser: { __typename?: "User"; id: number };
};

export type CitiesQueryVariables = Exact<{ [key: string]: never }>;

export type CitiesQuery = {
    __typename?: "Query";
    cities: Array<{
        __typename?: "City";
        id: number;
        name: string;
        photo?: string | null;
    }>;
};

export type GetCityQueryVariables = Exact<{
    query: Scalars["String"];
}>;

export type GetCityQuery = {
    __typename?: "Query";
    city: {
        __typename?: "City";
        id: number;
        name: string;
        latitude?: number | null;
        longitude?: number | null;
        poi?: Array<{
            __typename?: "Poi";
            id: number;
            name: string;
            address: string;
            latitude?: number | null;
            longitude?: number | null;
        }> | null;
    };
};

export type GetProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetProfileQuery = {
    __typename?: "Query";
    profile: {
        __typename?: "User";
        id: number;
        email?: string | null;
        role?: string | null;
        userName?: string | null;
        profilePicture?: string | null;
    };
};

export type LoginMutationVariables = Exact<{
    data: UserInput;
}>;

export type LoginMutation = { __typename?: "Mutation"; login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: string };

export type UpdateCityMutationVariables = Exact<{
    data: CityInput;
    updateCityId: Scalars["Int"];
}>;

export type UpdateCityMutation = {
    __typename?: "Mutation";
    updateCity: {
        __typename?: "City";
        id: number;
        name: string;
        latitude?: number | null;
        longitude?: number | null;
        users?: Array<{
            __typename?: "User";
            id: number;
            email?: string | null;
        }> | null;
        poi?: Array<{
            __typename?: "Poi";
            id: number;
            name: string;
            address: string;
        }> | null;
    };
};

export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
        createUser(data: $data) {
            id
        }
    }
`;
export type CreateUserMutationFn = Apollo.MutationFunction<
    CreateUserMutation,
    CreateUserMutationVariables
>;

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
export function useCreateUserMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreateUserMutation,
        CreateUserMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(
        CreateUserDocument,
        options
    );
}
export type CreateUserMutationHookResult = ReturnType<
    typeof useCreateUserMutation
>;
export type CreateUserMutationResult =
    Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<
    CreateUserMutation,
    CreateUserMutationVariables
>;
export const CitiesDocument = gql`
    query Cities {
        cities {
            id
            name
            photo
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
export function useCitiesQuery(
    baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(
        CitiesDocument,
        options
    );
}
export function useCitiesLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(
        CitiesDocument,
        options
    );
}
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<
    CitiesQuery,
    CitiesQueryVariables
>;
export const GetCityDocument = gql`
    query getCity($query: String!) {
        city(name: $query) {
            id
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
export function useGetCityQuery(
    baseOptions: Apollo.QueryHookOptions<GetCityQuery, GetCityQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetCityQuery, GetCityQueryVariables>(
        GetCityDocument,
        options
    );
}
export function useGetCityLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetCityQuery,
        GetCityQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetCityQuery, GetCityQueryVariables>(
        GetCityDocument,
        options
    );
}
export type GetCityQueryHookResult = ReturnType<typeof useGetCityQuery>;
export type GetCityLazyQueryHookResult = ReturnType<typeof useGetCityLazyQuery>;
export type GetCityQueryResult = Apollo.QueryResult<
    GetCityQuery,
    GetCityQueryVariables
>;
export const GetProfileDocument = gql`
    query getProfile {
        profile {
            id
            email
            role
            userName
            profilePicture
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
export function useGetProfileQuery(
    baseOptions?: Apollo.QueryHookOptions<
        GetProfileQuery,
        GetProfileQueryVariables
    >
) {
    console.log("useGetProfileQuery");

    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(
        GetProfileDocument,
        options
    );
}
export function useGetProfileLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<
        GetProfileQuery,
        GetProfileQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(
        GetProfileDocument,
        options
    );
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<
    typeof useGetProfileLazyQuery
>;
export type GetProfileQueryResult = Apollo.QueryResult<
    GetProfileQuery,
    GetProfileQueryVariables
>;
export const LoginDocument = gql`
    mutation Login($data: UserInput!) {
        login(data: $data)
    }
`;
export type LoginMutationFn = Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;

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
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        options
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const LogoutDocument = gql`
    mutation logout {
        logout
    }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
    LogoutMutation,
    LogoutMutationVariables
>;

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
export function useLogoutMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LogoutMutation,
        LogoutMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
        options
    );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
    LogoutMutation,
    LogoutMutationVariables
>;
export const UpdateCityDocument = gql`
    mutation UpdateCity($data: CityInput!, $updateCityId: Int!) {
        updateCity(data: $data, id: $updateCityId) {
            id
            name
            latitude
            longitude
            users {
                id
                email
            }
            poi {
                id
                name
                address
            }
        }
    }
`;
export type UpdateCityMutationFn = Apollo.MutationFunction<
    UpdateCityMutation,
    UpdateCityMutationVariables
>;

/**
 * __useUpdateCityMutation__
 *
 * To run a mutation, you first call `useUpdateCityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCityMutation, { data, loading, error }] = useUpdateCityMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateCityId: // value for 'updateCityId'
 *   },
 * });
 */
export function useUpdateCityMutation(
    baseOptions?: Apollo.MutationHookOptions<
        UpdateCityMutation,
        UpdateCityMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<UpdateCityMutation, UpdateCityMutationVariables>(
        UpdateCityDocument,
        options
    );
}
export type UpdateCityMutationHookResult = ReturnType<
    typeof useUpdateCityMutation
>;
export type UpdateCityMutationResult =
    Apollo.MutationResult<UpdateCityMutation>;
export type UpdateCityMutationOptions = Apollo.BaseMutationOptions<
    UpdateCityMutation,
    UpdateCityMutationVariables
>;
