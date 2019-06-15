namespace ICad.Action
{
    /**
     * OpenLog
     */
    export class ToggleLiveStat extends ICad.Action.ActionAppWorkflow
    {
        async act()
        {
           this.app.config.set('displayLiveStats', !this.app.config.get('displayLiveStats'));
           this.app.documents.update();
        }
    }
}
