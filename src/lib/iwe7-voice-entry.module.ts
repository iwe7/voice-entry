import { VoiceTransferComponent } from './voice-transfer/voice-transfer';
import { MatButtonModule, MatProgressSpinnerModule, MatChipsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Iwe7NavbarModule } from 'iwe7-navbar';
import { Iwe7LayoutModule } from 'iwe7-layout';
import { VoiceRecorderComponent } from './voice-recorder/voice-recorder';
import { VoiceEntryComponent } from './voice-entry/voice-entry';
import { NgModule } from '@angular/core';
import { Iwe7HammerModule } from 'iwe7-hammer';
import { Iwe7OnPressModule } from 'iwe7-on-press';
@NgModule({
  imports: [
    Iwe7LayoutModule,
    Iwe7NavbarModule,
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    Iwe7HammerModule,
    Iwe7OnPressModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
  declarations: [
    VoiceEntryComponent,
    VoiceRecorderComponent,
    VoiceTransferComponent
  ],
  exports: [
    VoiceEntryComponent,
    VoiceRecorderComponent,
    VoiceTransferComponent
  ],
  entryComponents: [
    VoiceRecorderComponent,
    VoiceTransferComponent
  ],
  providers: []
})
export class Iwe7VoiceEntryModule { }
