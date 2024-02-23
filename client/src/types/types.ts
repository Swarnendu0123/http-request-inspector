export type UserType = {
    accessToken: string
    auth: any
    displayName: string
    email: string
    emailVerified: boolean
    isAnonymous: boolean
    metadata: any
    phoneNumber: number
    photoURL: string
    proactiveRefresh: any
    providerId: string
    reloadListener: any
    uid: string
}


export type RequestType = {
    url: string
    method: string
    body: any
    headers: any
    query: any
    index: number
    time: string
}

