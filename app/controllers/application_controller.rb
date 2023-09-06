class ApplicationController < ActionController::API
#   skip_before_action :verify_authenticity_token
  before_action :authorize

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_response

  def authorize
      return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  end

  private 
  def render_unprocessable_entity_response e
      render json:  { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end

  def record_not_found_response
      render json: "Record not found", status: :not_found
  end

end
