import {Component, HostBinding, OnInit} from '@angular/core';

import {Project} from './project.model';

import {ProjectsService} from './projects.service';
import {markedTrigger, itemStateTrigger, slideStateTrigger} from './animations';
import {AnimationEvent} from '@angular/animations';
import {routeFadeStateTrigger, routeSlideStateTrigger} from '../animations/route-animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    markedTrigger,
    itemStateTrigger,
    slideStateTrigger,
    routeFadeStateTrigger,
    routeSlideStateTrigger
  ]
})
export class ProjectsComponent implements OnInit {
  @HostBinding('@routeSlideState') routeAnimation = true;
  projects: Project[];
  markedPrjIndex = 0;
  displayedProjects: Project[] = [];
  progress = 'progressing';
  createNew = false;

  constructor(private prjService: ProjectsService) {
  }

  ngOnInit() {
    this.prjService.loadProjects()
      .subscribe(
        (prj: Project[]) => {
          this.progress = 'finished';
          this.projects = prj;
          if (this.projects.length >= 1) {
            this.displayedProjects.push(this.projects[0]);
          }
        }
      );
  }

  onStatusUpdated(newStatus: string, id: number) {
    this.projects[id].status = newStatus;
  }

  onProjectDeleted(index: number) {
    this.projects.splice(index, 1);
  }

  onProjectCreated(project: Project) {
    this.createNew = false;
    setTimeout(() => {
      this.projects.unshift(project);
    }, 300);
  }

  onItemAnimated(animationEvent: AnimationEvent, lastProjectIndex: number) {
    if (animationEvent.fromState != 'void') {
      console.log('returns', animationEvent.fromState);
      return;
    }
    if (this.projects.length > lastProjectIndex + 1) {
      this.displayedProjects.push(this.projects[lastProjectIndex + 1]);
    }
    else {
      this.projects = this.displayedProjects;
    }
  }

}
