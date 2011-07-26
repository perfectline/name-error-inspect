require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(:default, Rails.env) if defined?(Bundler)

module NameErrorInspect
  class Application < Rails::Application

    config.encoding = "utf-8"

    config.filter_parameters                  += [:password, :password_confirmation]
    config.active_record.include_root_in_json = false

    config.assets.enabled    = true
  end
end
