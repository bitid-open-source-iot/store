export class Utility {

    public loading?: boolean;
    public selected?: boolean;

    constructor(args: UTILITY) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.loading) != 'undefined' && args.loading != null) {
                this.loading = args.loading;
            }
            if (typeof (args.selected) != 'undefined' && args.selected != null) {
                this.selected = args.selected;
            }
        }
    }

}

export interface UTILITY {
    loading?: boolean;
    selected?: boolean;
}
