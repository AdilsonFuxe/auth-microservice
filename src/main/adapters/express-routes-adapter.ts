import { Controller, HttpRequest } from '@src/interface/protocols';
import { Response, Request } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      accountId: req.accountId,
      query: req.query,
      params: req.params,
      headers: req.headers,
    };
    const httpResponse = await controller(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
