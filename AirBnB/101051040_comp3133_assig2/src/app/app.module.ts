import { Interceptor } from './Interceptor';
import { ListingsModule } from './listings/listings.module';
import { SignUpModule } from './auth/sign-up/sign-up.module';
import { LoginModule } from './auth/login/login.module';
import { HeaderModule } from './header/header.module';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageService } from './auth/auth.storageservice';
import { JWTTokenService } from './auth/auth.jwtservice';
import { AvailablelistingsModule } from './availablelistings/availablelistings.module';
import { BookingsModule } from './bookings/bookings.module';
import { MybookingsModule } from './mybookings/mybookings.module';
import { MylistingsModule } from './mylistings/mylistings.module';
import { onError } from '@apollo/client/link/error';

const error = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${JSON.stringify(
          message
        )}, Location: ${JSON.stringify(locations)}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HeaderModule,
    LoginModule,
    SignUpModule,
    ListingsModule,
    BookingsModule,
    MybookingsModule,
    MylistingsModule,
    AvailablelistingsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: error.concat(
            httpLink.create({
              uri: 'api/graphql',
            })
          ),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'cache-and-network',
              errorPolicy: 'all',
            },
            query: {
              fetchPolicy: 'network-only',
              errorPolicy: 'all',
            },
            mutate: {
              errorPolicy: 'all',
            },
          },
        };
      },
      deps: [HttpLink],
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
    },
    LocalStorageService,
    JWTTokenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
