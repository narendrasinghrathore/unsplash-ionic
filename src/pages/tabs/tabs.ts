import { Component } from '@angular/core';

import { DownloadPage } from '../download/download';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CommonService } from '../../services/common.service';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = DownloadPage;
  tab4Root = ContactPage;

  constructor(private commonService: CommonService) {

  }

  tabChanged(event) {
    this.commonService.tabChange(event.index);
  }
}
