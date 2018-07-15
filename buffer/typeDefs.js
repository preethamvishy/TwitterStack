export default `
  type Profile {
    id: String!
    formatted_username: String
    avatar: String
  }
  type Query {
    profiles: [Profile]
    profile: Profile
  }
  schema {
    query: Query
  }
`