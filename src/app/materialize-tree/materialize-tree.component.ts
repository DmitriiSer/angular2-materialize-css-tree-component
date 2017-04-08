import {
  Component,
  Input, Output,
  OnInit
} from '@angular/core';
import {
  animate,
  transition,
  trigger,
  state,
  style
} from '@angular/animations';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TreeNode } from 'app/shared/model';

const animationDuration = 0.2; // open / close animation duration in seconds
const easeInQuad: string = 'cubic-bezier(0.55, 0.085, 0.68, 0.53)';
const easeOutQuad: string = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

@Component({
  selector: 'app-materialize-tree',
  templateUrl: './materialize-tree.component.html',
  styleUrls: ['./materialize-tree.component.css'],
  animations: [
    trigger('treeNodeChildrenState', [
      state('false', style({
        height: 0,
        //opacity: 0
      })),
      state('true', style({
        //opacity: 1
      })),
      transition('false => true', animate(animationDuration + 's ' + easeInQuad)),
      transition('true => false', animate(animationDuration + 's ' + easeOutQuad))
    ])
  ]
})
export class MaterializeTreeComponent implements OnInit {
  // component options
  // The array represents a list of available values for the option.
  // First entry in array is the default value.

  @Input() displayField: string;                      // ['title', 'name', 'description', 'value', ...]
  @Input() childrenField: string;                     // ['children', 'elements', 'elems', ...]
  @Input() isExpandedField: string;                   // ['isExpanded', 'isOpen', 'open', 'expanded', ...]

  @Input() fontAwesomeIcon: boolean = true;           // [true, false]
  @Input() materialIcon: boolean;                     // [false, true]

  @Input() collapsibleType: string = 'expandable';    // ['expandable', 'accordion']

  @Input() expandedIcon: string = 'minus-square-o';   // ['minus-square-o', ...]
  @Input() collapsedIcon: string = 'plus-square-o';   // ['plus-square-o', ...]
  @Input() icon: string = 'fw';                       // ['fw', ...]

  @Input() padding: string;
  @Input() paddingLeft: string;
  @Input() paddingRight: string;

  @Input() dataFile: string;
  @Input() nodes: any[];

  // component fields
  @Input() isRoot: boolean = true;
  @Input() level: number = 0;

  constructor(private http: Http) { }

  ngOnInit() {
    //console.debug('ngOnInit()');
    switch (true) {
      case this.dataFile != null && this.nodes != null:
        throw new Error('The \'dataFile\' option cannot be specified together with the \'nodes\' option');
      case this.dataFile != null:
        // load data from the specified file
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.get(this.dataFile, options)
          .map((res: Response) => res.json())
          .catch(e => Observable.throw(e))
          .subscribe(data => {
            //console.debug('ngOnInit() first data');
            this.nodes = data;
            this.afterRootNodesReceived();
          });
        break;
      case this.nodes != null:
        //console.debug('ngOnInit() data');
        this.afterRootNodesReceived();
        break;
    }
  }

  afterRootNodesReceived(): void {
    if (this.isRoot) {
      this.nodes = this.normalizeNodes(this.nodes);
    }
  }

  getDefaultPaddingLeft(): string {
    let unit: string = 'rem';
    switch (this.level) {
      case 0: return 1 + unit;
      case 1: return 2.5 + unit;
      default: return 2 * (this.level - 2) + 4.5 + unit;
    }
  }

  getDefaultPaddingRight(): string {
    let unit: string = 'rem';
    return 1 + unit;
  }

  getPaddingLeft(): string {
    switch (true) {
      case this.paddingLeft != null:
        console.warn('TODO: getPaddingLeft(): case this.paddingRight != null');
        return '';
      case this.padding != null:
        console.warn('TODO: getPaddingLeft(): case this.padding != null');
        return '';
      default:
        return this.getDefaultPaddingLeft();
    }
  }

  getPaddingRight(): string {
    switch (true) {
      case this.paddingRight != null:
        console.warn('TODO: getPaddingRight(): case this.paddingRight != null');
        return '';
      case this.padding != null:
        console.warn('TODO: getPaddingRight(): case this.padding != null');
        return '';
      default:
        return this.getDefaultPaddingRight();
    }
  }

  normalizeNodes(nodes: any[]): TreeNode[] {
    if (nodes == null || nodes.length == 0)
      return [];

    for (let node of nodes) {
      let treeNode: TreeNode = <TreeNode>node;
      if (this.displayField != null) {
        treeNode.title = node[this.displayField];
        delete node[this.displayField];
      }
      if (this.isExpandedField != null) {
        treeNode.isExpanded = node[this.isExpandedField];
        delete node[this.isExpandedField];
      }
      if (this.childrenField != null && node[this.childrenField] != null) {
        treeNode.children = this.normalizeNodes(node[this.childrenField]);
        delete node[this.childrenField];
      }
    }
    return nodes;
  }
}
