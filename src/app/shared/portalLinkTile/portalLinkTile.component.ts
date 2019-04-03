import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: "portal-link-tile",
  templateUrl: './portalLinkTile.component.html',
})

export class PortalLinkTileComponent implements OnInit{
  @Input()
  routerLink: string;
  @Input()
  title: string;

  constructor(
  ){}


  ngOnInit(): void {

  }
}
