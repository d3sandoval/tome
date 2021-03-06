/* eslint-env jest */

const { restrictAccess, ensureAuthenticated, serverError } = require('.');

jest.spyOn(console, 'error');

describe('restrictAccess', () => {
  it('redirects to login, if not authenticated', () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };

    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();

    restrictAccess(req, res, next);
    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/login');
    expect(next).not.toHaveBeenCalled();
  });

  it('does not redirect, if logged in', () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };

    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();

    restrictAccess(req, res, next);
    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});

describe('ensureAuthenticated', () => {
  it('sends a 401 status, if not authenticated', () => {
    const req = {
      isAuthenticated: jest.fn(() => false),
    };

    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    ensureAuthenticated(req, res, next);
    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('does not send a status, if logged in', () => {
    const req = {
      isAuthenticated: jest.fn(() => true),
    };

    const res = {
      sendStatus: jest.fn(),
    };
    const next = jest.fn();

    ensureAuthenticated(req, res, next);
    expect(req.isAuthenticated).toHaveBeenCalled();
    expect(res.sendStatus).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});

describe('serverError', () => {
  const fakeRequest = { something: 'fake' };
  const fakeResponse = {
    status: jest.fn(),
    send: jest.fn(),
  };

  it('logs errors with request as string', () => {
    serverError(fakeRequest, fakeResponse);
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toContain(
      JSON.stringify(fakeRequest)
    );
  });

  it('logs error codes', () => {
    serverError(fakeRequest, fakeResponse, null, 123);
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toContain('123');
  });

  it('logs error descriptions', () => {
    serverError(fakeRequest, fakeResponse, null, 123, 'Some Test');
    expect(console.error.mock.calls.length).toBe(1);
    expect(console.error.mock.calls[0][0]).toContain('Some Test');
  });

  it('logs error stack traces', () => {
    try {
      throw new Error('Trace Test');
    } catch (e) {
      serverError(fakeRequest, fakeResponse, e);
    } finally {
      expect(console.error.mock.calls.length).toBe(1);
      expect(console.error.mock.calls[0][0]).toContain('Error: Trace Test');
    }
  });

  it('sends status in response', () => {
    serverError(fakeRequest, fakeResponse, null, 123);
    expect(fakeResponse.status).toBeCalledWith(123);
  });

  it('sends description in response', () => {
    serverError(fakeRequest, fakeResponse, null, 123, 'Some Test');
    expect(fakeResponse.send).toBeCalledWith({ error: 'Some Test' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
