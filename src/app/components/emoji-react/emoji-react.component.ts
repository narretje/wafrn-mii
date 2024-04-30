import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { EmojiCollectionsComponent } from '../emoji-collections/emoji-collections.component';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts.service';
import { LoaderComponent } from '../loader/loader.component';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-emoji-react',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    EmojiCollectionsComponent,
    FontAwesomeModule,
    OverlayModule,
    LoaderComponent
  ],
  templateUrl: './emoji-react.component.html',
  styleUrl: './emoji-react.component.scss'
})
export class EmojiReactComponent {

  plusIcon = faPlus;
  minusIcon = faMinus;
  scrollStrategy

  @Input() postId: string = ''
  isOpen = false;
  loading = false;


  constructor (
    private overlay: Overlay,
    private postsService: PostsService,
    private messages: MessageService
  ) {
    this.scrollStrategy = this.overlay.scrollStrategies.reposition();

  }

  async reactToPost(emoji: string) {
    this.loading = true;
    const response = await this.postsService.emojiReactPost(this.postId, emoji)
    if(response) {
      this.messages.add({
        severity: 'success',
        summary: `Reacted with ${emoji} succesfully`
      })
      this.isOpen = false;
      this.loading = false;
    } else {
      this.messages.add({
        severity: 'error',
        summary: `Something went wrong!`
      })
      this.loading = false
    }
    
  }

  openOverlay() {
    this.isOpen = !this.isOpen;
    // TODO it would be cool/nice to only allow SOME scroll before it closed.
    // that would require some subscriptions and stuff that could be hacky tho
    }
}
