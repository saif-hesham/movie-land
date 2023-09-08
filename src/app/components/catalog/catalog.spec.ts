import { TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { HttpCommincationService } from './httpCommunication.service';
import { HttpClientModule } from '@angular/common/http';

describe('Component: Catalog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent],
      imports: [HttpClientModule],
      providers: [HttpCommincationService],
    });
  });

  it('Should create the Catalog App', () => {
    let fixture = TestBed.createComponent(CatalogComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should make sure that movies are created on the dom', () => {
    let fixture = TestBed.createComponent(CatalogComponent);
    let app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(app.movies.length).toEqual(20);
    });
  });
});
