namespace ICad.View.Form.Input
{
    export interface InputInterface<T>
    {
        title : string;
        name : string;
        value : T;

        focus();
    }
}
