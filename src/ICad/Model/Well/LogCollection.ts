namespace ICad.Model.Well
{
    /**
     * Log
     */
    export class LogCollection extends ICad.Model.AbstractModelCollection<Log>
    {
        /** Name of this log.*/
        _logs : Map<string, Log>
        
        constructor()
        {
            super();
            this._logs = new Map();
        }

        add(log:Log)
        {
            this._logs.set(log.uuid, log);
        }

        withUUID(uuid: string) : Log
        {
            return this._logs.get(uuid);
        }
    }
}
