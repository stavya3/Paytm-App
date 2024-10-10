


export const Users = () => {
    return <>
        <div className="font-bold mt-6 text-lg">Users</div>
        <div className="my-2">
            <input placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" type="text" />
        </div>
        <div>
            {Users.map(user => <User user={user} />)}
        </div>
    </>
};