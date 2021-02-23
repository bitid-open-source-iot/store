import { ToastService } from 'src/app/services/toast/toast.service';
import { ReviewsService } from 'src/app/services/reviews/reviews.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OnInit, Inject, Component, OnDestroy } from '@angular/core';

@Component({
    selector: 'product-review-dialog',
    styleUrls: ['./review.dialog.scss'],
    templateUrl: './review.dialog.html'
})

export class ProductReviewDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<ProductReviewDialog>, @Inject(MAT_DIALOG_DATA) private data: any, private toast: ToastService, private service: ReviewsService, private formerror: FormErrorService) { };

    public form: FormGroup = new FormGroup({
        score: new FormControl(5, [Validators.required, Validators.min(1), Validators.max(5)]),
        message: new FormControl('', [Validators.required])
    });
    public title: string = this.data.title;
    public errors: any = {};
    public loading: boolean;
    private subscriptions: any = {};

    public async close() {
        this.dialog.close(false);
    };

    public async submit() {
        this.loading = true;

        const response = await this.service.add({
            'score': this.form.value.score,
            'message': this.form.value.message,
            'productId': this.data.productId
        });

        if (response.ok) {
            this.toast.success('Review recieved pending approval!');
        } else {
            this.toast.error(response.error.message);
        };

        this.dialog.close(false);

        this.loading = false;
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
    };

}