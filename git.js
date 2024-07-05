import { simpleGit } from "simple-git"

const name = (pref='a_') => {
    const date = new Date()
    let d = date.getDate()
    let m = date.getMonth() + 1
    let y = (date.getFullYear()).toString().slice(-2)
    return `${pref}${(d < 10 ? '0' : '') + d}${(m < 10 ? '0' : '') + m}${y}`
}

simpleGit()
    .status((err, status) => {
        const com = name()
        if (err) {
            console.log('error', err)            
        } else {
            console.log('modified:', status.modified)
            if (status.modified.length > 0) {
                simpleGit()
                    .add('./*')
                    .commit(com)
                    .push(['-u', 'origin', 'main'], () => console.log(`commit ${com} is pushed to github`))
            } else {
                console.log('no new/updated files')
            }
        }
    })