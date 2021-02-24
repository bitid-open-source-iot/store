import { ObjectId } from "./object-id";

export class CourierOption {

    public type?: string;
    public price?: number;
    public optionId?: string = ObjectId();

    constructor(args?: COURIER_OPTION) {
        if (typeof (args) != 'undefined' && args != null) {
            if (typeof (args.type) != 'undefined' && args.type != null) {
                this.type = args.type;
            }
            if (typeof (args.price) != 'undefined' && args.price != null) {
                this.price = args.price;
            }
            if (typeof (args.optionId) != 'undefined' && args.optionId != null) {
                this.optionId = args.optionId;
            }
        }
    }

}

interface COURIER_OPTION {
    type?: string;
    price?: number;
    optionId?: string;
}