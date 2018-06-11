import { onTouchStart, onTouchEnd, onTouchCancel } from 'iwe7-util';
import { Directive, ElementRef, EventEmitter, Output, Input } from '@angular/core';
import { interval, merge } from 'rxjs';
import { switchMap, takeUntil, tap, map, filter, take, takeWhile } from 'rxjs/operators';

@Directive({ selector: '[onPress]' })
export class OnPressDirective {
    @Output() onPress: EventEmitter<number> = new EventEmitter();
    pressTime: number = 0;
    @Output() onRelease: EventEmitter<number> = new EventEmitter();
    @Output() onPressing: EventEmitter<number> = new EventEmitter();
    @Input() start: number = 10;
    hasPrese: boolean = false;
    constructor(public ele: ElementRef) { }
    ngAfterViewInit() {
        const touchStart$ = onTouchStart(this.ele.nativeElement);
        const touchEnd$ = onTouchEnd(this.ele.nativeElement);
        const touchCancel$ = onTouchCancel(this.ele.nativeElement);
        const touchCancelOrEnd$ = merge(touchEnd$, touchCancel$).pipe(take(1));
        // 开始计时
        touchCancelOrEnd$.pipe(
            takeWhile(res => this.hasPrese)
        ).subscribe(res => {
            // 释放 超过1秒可以触发释放
            this.onRelease.emit();
        });
        this.onPress.pipe(
            tap(res => this.hasPrese = true),
            map(res => 0),
            switchMap(res => {
                return interval(100).pipe(
                    takeUntil(touchCancelOrEnd$),
                    map(res => res++),
                    tap(res => this.onPressing.emit(res / 10))
                );
            })
        ).subscribe();
        touchStart$.pipe(
            tap(res => res.preventDefault()),
            tap(res => res.stopPropagation()),
            // 初始化时间为0
            map((e: TouchEvent) => 0),
            switchMap(pressTime => {
                // 开始计时
                return interval(100).pipe(
                    // touchEnd结束
                    takeUntil(
                        merge(touchEnd$, touchCancel$)
                    ),
                    map(res => {
                        return pressTime++;
                    }),
                    // 触发press
                    filter(res => res > this.start),
                    take(1),
                    tap(res => this.onPress.emit())
                );
            })
        ).subscribe();
    }
}