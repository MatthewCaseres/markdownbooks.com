import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  completeProblem?: Maybe<Problem>;
  flagProblem?: Maybe<Problem>;
};


export type MutationCompleteProblemArgs = {
  id: Scalars['String'];
};


export type MutationFlagProblemArgs = {
  flag: Scalars['Int'];
  id: Scalars['String'];
};

export type Problem = {
  __typename?: 'Problem';
  completed: Scalars['Boolean'];
  flagged: Scalars['Int'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  problem?: Maybe<Problem>;
  problems: Array<Problem>;
};


export type QueryProblemArgs = {
  id: Scalars['String'];
};

export type CompleteProblemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type CompleteProblemMutation = (
  { __typename?: 'Mutation' }
  & { completeProblem?: Maybe<(
    { __typename?: 'Problem' }
    & Pick<Problem, 'id' | 'completed' | 'flagged'>
  )> }
);

export type GetProblemQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetProblemQuery = (
  { __typename?: 'Query' }
  & { problem?: Maybe<(
    { __typename?: 'Problem' }
    & Pick<Problem, 'id' | 'flagged' | 'completed'>
  )> }
);

export type GetProblemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProblemsQuery = (
  { __typename?: 'Query' }
  & { problems: Array<(
    { __typename?: 'Problem' }
    & Pick<Problem, 'id' | 'completed' | 'flagged'>
  )> }
);

export type FlagProblemMutationVariables = Exact<{
  id: Scalars['String'];
  flag: Scalars['Int'];
}>;


export type FlagProblemMutation = (
  { __typename?: 'Mutation' }
  & { flagProblem?: Maybe<(
    { __typename?: 'Problem' }
    & Pick<Problem, 'id' | 'completed' | 'flagged'>
  )> }
);


export const CompleteProblemDocument: DocumentNode<CompleteProblemMutation, CompleteProblemMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteProblem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeProblem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"}}]}}]}}]};
export const GetProblemDocument: DocumentNode<GetProblemQuery, GetProblemQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProblem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"problem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]};
export const GetProblemsDocument: DocumentNode<GetProblemsQuery, GetProblemsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProblems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"problems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"}}]}}]}}]};
export const FlagProblemDocument: DocumentNode<FlagProblemMutation, FlagProblemMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FlagProblem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"flag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flagProblem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"flag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"flag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"flagged"}}]}}]}}]};