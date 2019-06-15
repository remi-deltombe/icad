namespace ICad.View
{
    /**
     * AbstractView
     * @abstract
     */
    export interface ViewInterface
    {
        /**
         * Refresh the render of this view.
         * All children of this view are refreshing too.
         */
        render();
        
        /**
         * Update the content of this view without regenerate it
         * All children of this view are updated too.
         */
        update();

        clear();

        /**
         *
         */
        invalidate();

        /**
         * Add a child to this view.
         * Remove the child of the old parent, if needed.
         * @param {ICad.View.AbstractView} child 
         */
        addChild(child : ICad.View.AbstractView);
        
        /**
         * Remove a child from this view.
         * @param {ICad.View.AbstractView} child 
         */
        removeChild(child : ICad.View.AbstractView);

        /**
         * Remove all children from this view.
         * @param {ICad.View.AbstractView} child 
         */
        removeChildren();
        
        /**
         *
         */
        hasClass(_class:string);
        
        /**
         *
         */
        addClasses(classes:string);

        /**
         *
         */
        removeClasses(classes:string);

        /**
         *
         */
        toggleClasses(classes:string);
    }
}
