/**
 * Skenario pengujian E2E untuk alur login:
 * 
 * - harus menampilkan halaman login dengan elemen form yang lengkap
 * - harus menampilkan pesan kesalahan (alert) jika email atau password salah
 * - harus mengarahkan ke halaman utama dan menampilkan informasi pengguna jika login sukses
 */
describe('Login flow', () => {
  beforeEach(() => {
    // Intercept data initial page load (users and threads)
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          users: [
            { id: 'user-1', name: 'John Doe', email: 'john@example.com', avatar: 'https://generated-image-url.jpg' }
          ]
        }
      }
    }).as('getUsers');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          threads: [
            { id: 'thread-1', title: 'Test Thread', body: 'Thread Body', category: 'testing', createdAt: '2026-06-26T00:00:00.000Z', ownerId: 'user-1', upVotesBy: [], downVotesBy: [], totalComments: 0 }
          ]
        }
      }
    }).as('getThreads');

    cy.visit('/login');
  });

  it('should display login page with form elements', () => {
    cy.get('h2.form-title').should('contain', 'Masuk ke Forum');
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Masuk');
  });

  it('should show alert warning when email or password is wrong', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'email or password is wrong'
      }
    }).as('loginFail');

    // Spy on window.alert
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get('input#email').type('wrong@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginFail');
    cy.then(() => {
      expect(alertStub).to.have.been.calledWith('email or password is wrong');
    });
  });

  it('should navigate to homepage and display user info when login is successful', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          token: 'valid-jwt-token'
        }
      }
    }).as('loginSuccess');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg'
          }
        }
      }
    }).as('getProfile');

    cy.get('input#email').type('john@example.com');
    cy.get('input#password').type('password123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginSuccess');
    cy.wait('@getProfile');

    // Should redirect to main page and show header avatar/username
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('.header-username').should('contain', 'John Doe');
    cy.get('.bottom-nav').should('contain', 'Logout');
  });
});
