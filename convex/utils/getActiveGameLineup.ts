// Returns the keys of the object that have a value of true
export function getActiveGameLineup(gameLineup: object) : string[] {
    return Object.keys(gameLineup)
        .filter((key): key is keyof typeof gameLineup => 
            gameLineup[key as keyof typeof gameLineup] === true
        )
}