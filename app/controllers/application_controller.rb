class ApplicationController < ActionController::Base
  protect_from_forgery

  layout lambda { |controller| controller.request.xhr? ? nil : 'application' }

end
